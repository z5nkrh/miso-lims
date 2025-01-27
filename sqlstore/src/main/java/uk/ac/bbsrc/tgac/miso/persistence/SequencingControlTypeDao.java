package uk.ac.bbsrc.tgac.miso.persistence;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import uk.ac.bbsrc.tgac.miso.core.data.SequencingControlType;

public interface SequencingControlTypeDao extends SaveDao<SequencingControlType> {

  SequencingControlType getByAlias(String alias) throws IOException;

  long getUsage(SequencingControlType sequencingControlType) throws IOException;

  List<SequencingControlType> listByIdList(Collection<Long> ids) throws IOException;

}
